# ========================================================
# Swachh Flux National Data Ingestion & Analytics ETL
# High Scale PySpark Batch Pipeline Spec
# Runs in AWS EMR / Databricks Clusters
# ========================================================

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date, sum, avg, count, when, lit
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, FloatType, TimestampType

def main():
    # Initialize Spark Session configured for high-performance S3 analytics
    spark = SparkSession.builder \
        .appName("NationalUrbanOpsPlatform-ETL") \
        .config("spark.sql.parquet.compression.codec", "snappy") \
        .config("spark.sql.shuffle.partitions", "200") \
        .getOrCreate()

    # Define schema for raw telemetry JSON inputs from S3 Ingestion Bucket
    telemetry_schema = StructType([
        StructField("pingId", StringType(), False),
        StructField("vehicleId", StringType(), False),
        StructField("tenantId", StringType(), False),
        StructField("latitude", DoubleType(), False),
        StructField("longitude", DoubleType(), False),
        StructField("speedKmh", FloatType(), False),
        StructField("headingDegrees", FloatType(), False),
        StructField("timestamp", TimestampType(), False)
    ])

    print("Step 1: Reading raw telemetry records from S3 staging lake...")
    raw_pings_df = spark.read \
        .schema(telemetry_schema) \
        .json("s3a://swachh-flux-data-lake-raw/telemetry/gps/*/*/*/*.json")

    # Add date partition field
    processed_pings_df = raw_pings_df.withColumn("date_partition", to_date(col("timestamp")))

    print("Step 2: Archiving raw pings to high-performance historical partition layer...")
    processed_pings_df.write \
        .partitionBy("tenantId", "date_partition") \
        .mode("append") \
        .parquet("s3a://swachh-flux-data-lake-clean/telemetry/gps/")

    print("Step 3: Generating Daily Fleet Operations Aggregates...")
    # Aggregating daily mileage, speed, and anomalies
    daily_fleet_stats = processed_pings_df.groupBy("tenantId", "date_partition", "vehicleId") \
        .agg(
            count("pingId").alias("total_pings"),
            avg("speedKmh").alias("avg_speed_kmh"),
            sum(when(col("speedKmh") > 80, 1).otherwise(0)).alias("speed_violation_count")
        )

    print("Step 4: Writing Daily Fleet metrics to Analytical Warehouse...")
    daily_fleet_stats.write \
        .mode("overwrite") \
        .format("jdbc") \
        .option("url", "jdbc:postgresql://aurora-dw.urban.gov.in:5432/national_urban_ops") \
        .option("dbtable", "analytical_lakehouse_prod.agg_daily_fleet_metrics") \
        .option("user", "analytics_writer") \
        .option("password", "SecureAnalyticsGovSecure_#") \
        .save()

    print("ETL Batch Pipeline Job completed successfully.")
    spark.stop()

if __name__ == "__main__":
    main()
