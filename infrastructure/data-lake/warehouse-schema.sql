-- ========================================================
-- Swachh Flux Data Lake Analytical Warehouse Schemas (Snowflake / BigQuery)
-- ========================================================

CREATE SCHEMA IF NOT EXISTS analytical_lakehouse_prod;

-- 1. Fact Table: High Volume GPS Ping Records
-- Partitioned by: date_partition (e.g., YYYY-MM-DD), Tenant ID
CREATE TABLE IF NOT EXISTS analytical_lakehouse_prod.fact_vehicle_telemetry_historical (
    ping_id VARCHAR(64) NOT NULL,
    vehicle_id VARCHAR(64) NOT NULL,
    tenant_id VARCHAR(32) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    speed_kmh FLOAT NOT NULL,
    heading_degrees FLOAT NOT NULL,
    ping_timestamp TIMESTAMP_TZ NOT NULL,
    date_partition DATE NOT NULL
) 
CLUSTER BY (tenant_id, date_partition);

-- 2. Fact Table: Citizen Complaint Lifecycle Historical Timeline
CREATE TABLE IF NOT EXISTS analytical_lakehouse_prod.fact_complaints_history (
    complaint_id VARCHAR(64) NOT NULL,
    ticket_no VARCHAR(32) NOT NULL,
    tenant_id VARCHAR(32) NOT NULL,
    category VARCHAR(64) NOT NULL,
    priority VARCHAR(16) NOT NULL,
    final_status VARCHAR(16) NOT NULL,
    reported_at TIMESTAMP_TZ NOT NULL,
    resolved_at TIMESTAMP_TZ,
    sla_hours_allotted INT NOT NULL,
    sla_resolution_actual_hours FLOAT,
    is_sla_breached BOOLEAN DEFAULT FALSE,
    carbon_saved_estimate_kg FLOAT,
    feedback_rating INT
)
CLUSTER BY (tenant_id, category);

-- 3. Fact Table: Financial Penalties and Invoices Audit Log
CREATE TABLE IF NOT EXISTS analytical_lakehouse_prod.fact_financial_ledgers (
    ledger_id VARCHAR(64) NOT NULL,
    invoice_no VARCHAR(64) NOT NULL,
    tenant_id VARCHAR(32) NOT NULL,
    contractor_id VARCHAR(64) NOT NULL,
    base_billing_amount_inr DOUBLE PRECISION NOT NULL,
    penalties_applied_inr DOUBLE PRECISION DEFAULT 0,
    settled_payout_amount_inr DOUBLE PRECISION NOT NULL,
    approved_at TIMESTAMP_TZ NOT NULL,
    approved_by VARCHAR(64) NOT NULL
)
CLUSTER BY (tenant_id, contractor_id);

-- 4. Aggregated Table: Daily Municipal Cleanliness Index (City Benchmarking)
CREATE TABLE IF NOT EXISTS analytical_lakehouse_prod.agg_daily_municipal_benchmarks (
    benchmark_date DATE NOT NULL,
    tenant_id VARCHAR(32) NOT NULL,
    city_name VARCHAR(128) NOT NULL,
    total_active_complaints INT NOT NULL,
    sla_compliance_rate_percent FLOAT NOT NULL,
    total_waste_recycled_tons FLOAT NOT NULL,
    total_carbon_saved_tons FLOAT NOT NULL,
    route_coverage_rate_percent FLOAT NOT NULL,
    governance_compliance_score FLOAT NOT NULL,
    national_cleanliness_rating INT NOT NULL, -- Computed score from 1-100
    PRIMARY KEY (benchmark_date, tenant_id)
);
