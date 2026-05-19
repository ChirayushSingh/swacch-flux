provider "aws" {
  region = "ap-south-1" # Primary region: Mumbai
}

resource "aws_vpc" "national_swachh_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "national-swachh-vpc"
    Tier = "SmartCity-Core"
  }
}

resource "aws_subnet" "public_subnets" {
  count             = 3
  vpc_id            = aws_vpc.national_swachh_vpc.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = "ap-south-1${element(["a", "b", "c"], count.index)}"

  map_public_ip_on_launch = true

  tags = {
    Name = "national-swachh-public-${count.index}"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = 3
  vpc_id            = aws_vpc.national_swachh_vpc.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = "ap-south-1${element(["a", "b", "c"], count.index)}"

  tags = {
    Name = "national-swachh-private-${count.index}"
  }
}

# --- EKS Cluster ---
resource "aws_eks_cluster" "swachh_eks" {
  name     = "national-urban-ops-eks"
  role_arn = aws_iam_role.eks_master_role.arn

  vpc_config {
    subnet_ids = concat(aws_subnet.public_subnets.*.id, aws_subnet.private_subnets.*.id)
  }
}

resource "aws_eks_node_group" "standard_node_group" {
  cluster_name    = aws_eks_cluster.swachh_eks.name
  node_group_name = "standard-compute-nodes"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = aws_subnet.private_subnets.*.id

  scaling_config {
    desired_size = 6
    max_size     = 50
    min_size     = 3
  }

  instance_types = ["c6i.2xlarge"] # High compute instances for GIS and Telemetry pipelines
}

resource "aws_iam_role" "eks_master_role" {
  name = "eks-master-control-plane-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_master_role.name
}

resource "aws_iam_role" "eks_node_role" {
  name = "eks-worker-nodes-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_worker_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_node_role.name
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_node_role.name
}

resource "aws_iam_role_policy_attachment" "eks_registry_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks_node_role.name
}
