require 'assert'
require 'romo'

module Romo

  class UnitTests < Assert::Context
    desc "Romo"
    subject{ Romo }

    should have_imeths :gem_assets_path

    should "know its assets path based on the gem's path" do
      spec = Gem::Specification.find_by_name('romo', Romo::VERSION)
      expected = File.join(spec.gem_dir, 'assets')

      assert_equal expected, subject.gem_assets_path.to_s
    end

  end

end
