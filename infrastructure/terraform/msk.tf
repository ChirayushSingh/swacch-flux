# --- Managed Kafka Cluster (MSK) ---
resource "aws_security_group" "msk_sg" {
  name        = "swachh-msk-security-group"
  vpc_id      = aws_vpc.national_swachh_vpc.id
  description = "Traffic policy for real-time Kafka event streams"

  ingress {
    description = "Allow EKS nodes to publish/consume Kafka telemetry streams"
    from_port   = 9092
    to_port     = 9094
    protocol    = "tcp"
    security_groups = [aws_eks_cluster.swachh_eks.vpc_config[0].cluster_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_msk_cluster" "swachh_kafka" {
  cluster_name           = "national-swachh-telemetry-streams"
  kafka_version          = "3.4.0"
  number_of_broker_nodes = 6

  broker_node_group_info {
    instance_type = "kafka.m5.4xlarge" # Heavily scaled streaming brokers
    client_subnets = aws_subnet.private_subnets.*.id
    security_groups = [aws_security_group.msk_sg.id]
    storage_info {
      ebs_storage_info {
        volume_size = 5000 # 5 TB storage per broker node for historical streaming queues
      }
    }
  }

  encryption_info {
    encryption_in_transit {
      client_broker = "TLS"
      in_cluster    = true
    }
    encryption_at_rest {
      data_volume_kms_key_id = aws_kms_key.msk_key.arn
    }
  }

  tags = {
    Environment = "Production"
    Pipeline    = "NationalTelemetry-Ingest"
  }
}

resource "aws_kms_key" "msk_key" {
  description = "KMS Encryption Key for Secure telemetry streams at rest"
}
