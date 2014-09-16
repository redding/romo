require 'assert'
require 'romo/dassets'

require 'dassets'
require 'dassets-sass'
require 'dassets-erb'

module Romo::Dassets

  class UnitTests < Assert::Context
    desc "Romo::Dassets"
    subject{ Romo::Dassets }

    should "configure Romo with Dassets" do
      subject.configure!

      source = Dassets.config.sources.detect do |source|
        source.path == Romo.gem_assets_path.to_s
      end
      assert source
      assert_instance_of Dassets::Sass::Engine, source.engines["scss"]
      assert_instance_of Dassets::Erb::Engine,  source.engines["erb"]

      exp_css_sources = [
        'css/romo/normalize.css',
        'css/romo/base.css',
        'css/romo/forms.css',
        'css/romo/buttons.css',
        'css/romo/labels.css',
        'css/romo/tabs.css',
        'css/romo/lists.css',
        'css/romo/grid.css',
        'css/romo/table.css',
        'css/romo/grid_table.css',
        'css/romo/dropdown.css',
        'css/romo/modal.css',
        'css/romo/select.css',
        'css/romo/datepicker.css',
        'css/romo/tooltip.css',
        'css/romo/sortable.css',
        'css/romo/z_index.css',
      ]
      assert_equal exp_css_sources, Dassets.config.combinations['css/romo.css']

      exp_js_sources = [
        'js/romo/base.js',
        'js/romo/invoke.js',
        'js/romo/form.js',
        'js/romo/dropdown.js',
        'js/romo/dropdown_form.js',
        'js/romo/select.js',
        'js/romo/datepicker.js',
        'js/romo/inline.js',
        'js/romo/inline_form.js',
        'js/romo/modal.js',
        'js/romo/modal_form.js',
        'js/romo/tooltip.js',
        'js/romo/indicator.js',
        'js/romo/sortable.js',
      ]
      assert_equal exp_js_sources, Dassets.config.combinations['js/romo.js']
    end

  end

end
