data "aws_availability_zones" "available" {
    state = "available"
}

data "aws_eks_cluster" "config" {
    name = aws_eks_cluster.crm.name
}

