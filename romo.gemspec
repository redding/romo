# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "romo/version"

Gem::Specification.new do |gem|
  gem.name        = "romo"
  gem.version     = Romo::VERSION
  gem.authors     = ["Kelly Redding", "Collin Redding"]
  gem.email       = ["kelly@kellyredding.com", "collin.redding@me.com"]
  gem.summary     = %q{A UI Toolkit}
  gem.description = %q{A UI Toolkit}
  gem.homepage    = "http://github.com/redding/romo"
  gem.license     = 'MIT'

  gem_files = `git ls-files`.split($/)
  gem_files -= gem_files.grep(%r{^(gh-pages)/})
  gem.files         = gem_files
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_development_dependency("assert", ["~> 2.16.3"])

  # TODO: make a romo-dassets gem that brings in these dependencies someday
  gem.add_dependency("dassets",      ["~> 0.14.0"])
  gem.add_dependency("dassets-sass", ["~> 0.4.0"])

end
