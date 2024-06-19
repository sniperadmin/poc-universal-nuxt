terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.16.0"
    }
  }
}

provider "linode" {
  token = var.linode_token
}

resource "linode_lke_cluster" "test-cluster" {
  label       = "test-cluster"
  k8s_version = "1.28"
  region      = "it-mil"
  tags        = ["prod"]

  pool {
    # NOTE: If count is undefined, the initial node count will
    # equal the minimum autoscaler node count.
    type  = "g6-standard-1"
    count = var.node_count
  }
}

resource "linode_nodebalancer_config" "example-nodebalancer-config" {
  nodebalancer_id = linode_nodebalancer.example-nodebalancer.id
  port            = 80
  protocol        = "http"
  check           = "http_body"
  check_path      = "/healthcheck/"
  check_body      = "healthcheck"
  check_attempts  = 30
  check_timeout   = 25
  check_interval  = 30
  stickiness      = "http_cookie"
  algorithm       = "roundrobin"
}

resource "linode_nodebalancer_node" "example-nodebalancer-node" {
  count           = var.node_count
  nodebalancer_id = linode_nodebalancer.example-nodebalancer.id
  config_id       = linode_nodebalancer_config.example-nodebalancer-config.id
  label           = "example-node-${count.index + 1}"
  address         = "${element(linode_instance.example-instance.*.private_ip_address, count.index)}:80"
  mode            = "accept"
}
