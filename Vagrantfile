# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.define "db" do |db|
    db.vm.host_name = "postgresql" 
    db.vm.network :private_network, ip: "10.0.0.10"
  end

  config.vm.define "backend" do |backend|
    backend.vm.network :private_network, ip: "10.0.0.11"
  end

  config.vm.define "frontend" do |frontend|
    frontend.vm.network :private_network, ip: "10.0.0.12"
    frontend.vm.network "forwarded_port", guest: 80, host: 5000, host_ip: "127.0.0.1"
  end

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "ansible/playbook.yml"
  end
end
