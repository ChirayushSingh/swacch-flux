# --- Aurora PostgreSQL Cluster ---
resource "aws_rds_global_cluster" "swachh_global_db" {
  global_cluster_identifier = "national-swachh-global-database"
  engine                    = "aurora-postgresql"
  engine_version            = "15.4"
  database_name             = "national_urban_ops"
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "swachh-rds-private-subnet-group"
  subnet_ids = aws_subnet.private_subnets.*.id
}

resource "aws_rds_cluster" "primary_cluster" {
  cluster_identifier        = "swachh-mumbai-primary-cluster"
  engine                    = aws_rds_global_cluster.swachh_global_db.engine
  engine_version            = aws_rds_global_cluster.swachh_global_db.engine_version
  global_cluster_identifier = aws_rds_global_cluster.swachh_global_db.id
  
  master_username           = "superadmin_urban"
  master_password           = "Gov_National_Secured_2026_#"
  
  db_subnet_group_name      = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids    = [aws_security_group.rds_sg.id]
  
  storage_encrypted         = true
  backup_retention_period   = 35
  copy_tags_to_snapshot     = true
  
  tags = {
    Location = "ap-south-1"
    Role     = "Primary"
  }
}

# Clustered instances
resource "aws_rds_cluster_instance" "primary_instances" {
  count              = 3
  identifier         = "swachh-primary-db-instance-${count.index}"
  cluster_identifier = aws_rds_cluster.primary_cluster.id
  instance_class     = "db.r6g.4xlarge" # Memory-optimized gravity databases
  engine             = aws_rds_cluster.primary_cluster.engine
  engine_version     = aws_rds_cluster.primary_cluster.engine_version
}

# --- Database Security Group ---
resource "aws_security_group" "rds_sg" {
  name        = "swachh-db-security-group"
  description = "Access control for government core databases"
  vpc_id      = aws_vpc.national_swachh_vpc.id

  ingress {
    description = "Allow PostgreSQL from worker node groups only"
    from_port   = 5432
    to_port     = 5432
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
