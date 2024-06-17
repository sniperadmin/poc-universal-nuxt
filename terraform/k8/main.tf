terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.16.0"
    }
  }
}

module "k8s" {
  source             = "linode/k8s/linode"
  version            = "0.1.2"
  linode_token       = var.linode_token
  server_type_master = var.server_type_master
  server_type_node   = var.server_type_node
  cluster_name       = var.cluster_name
  k8s_version        = var.k8s_version
  region             = var.region
  nodes              = var.nodes
}
