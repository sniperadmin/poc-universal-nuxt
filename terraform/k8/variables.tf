variable "linode_token" {
  description = "token here"
}

variable "server_type_master" {
  default     = "g6-standard-1"
  description = "Linode Instance type: g6-nanode-1 g6-standard-1 g6-standard-2 g6-standard-4 g6-standard-6 g6-standard-8 g6-standard-16 g6-standard-20 g6-standard-24 g6-standard-32 g6-highmem-1 g6-highmem-2 g6-highmem-4 g6-highmem-8 g6-highmem-16"
}

variable "server_type_node" {
  default     = "g6-standard-2"
  description = "Linode Instance type: g6-nanode-1 g6-standard-1 g6-standard-2 g6-standard-4 g6-standard-6 g6-standard-8 g6-standard-16 g6-standard-20 g6-standard-24 g6-standard-32 g6-highmem-1 g6-highmem-2 g6-highmem-4 g6-highmem-8 g6-highmem-16"
}

variable "cluster_name" {
  default     = "example-cluster-name"
  description = "cluster name here"
}

variable "k8s_version" {
  default     = ""
  description = "kubernetes version"
}

variable "region" {
  default     = "it-mil-2"
  description = "Values: us-east, ap-west, etc."
}

variable "nodes" {
  default     = 2
  description = "min number of required nodes"
}
