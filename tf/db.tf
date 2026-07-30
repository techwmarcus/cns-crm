resource "aws_db_subnet_group" "crm-db-subnet-group" {
  name       = "main"
  subnet_ids = [for s in aws_subnet.public : s.id]

  tags = {
    Name = "My DB subnet group"
  }
}


resource "aws_db_instance" "crm" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  db_name              = "cns_crm_db"
  username             = "admin1"
  password             = "password123"
  parameter_group_name = "default.mysql8.0"
  publicly_accessible  = true
  skip_final_snapshot  = true 
  vpc_security_group_ids = [aws_security_group.public.id]
  db_subnet_group_name = aws_db_subnet_group.crm-db-subnet-group.name

}
output "db_endpoint" {
  value = aws_db_instance.crm.endpoint
  description = "The endpoint of the RDS instance"
}
output "db_instance_id" {
  value = aws_db_instance.crm.username
  description = "The name of the RDS instance"
}
output "db_password" {
  value = aws_db_instance.crm.password
  sensitive = true
  description = "The password of the RDS instance"
}