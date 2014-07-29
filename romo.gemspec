# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "romo/version"

Gem::Specification.new do |gem|
  gem.name        = "romo"
  gem.version     = Romo::VERSION
  gem.authors     = ["Kelly Redding"]
  gem.email       = ["kelly@kellyredding.com"]
  gem.description = %q{UI Toolkit}
  gem.summary     = %q{UI Toolkit}
  gem.homepage    = "http://github.com/__/romo"
  gem.license     = 'MIT'

  gem_files = `git ls-files`.split($/)
  gem_files -= gem_files.grep(%r{^(gh-pages)/})
  gem.files         = gem_files
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_development_dependency("assert", ["~> 2.10"])

end
