variable "linode_token" {
  type        = string
  description = "Linode API token"
  sensitive   = true
}

variable "region" {
  default     = "it-mil-2"
  description = "Values: us-east, ap-west, etc."
}

variable "node_count" {
  type        = number
  default     = 2
  description = "Default node count for any instance"
}
