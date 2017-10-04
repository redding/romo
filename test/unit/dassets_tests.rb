require 'assert'
require 'romo/dassets'

require 'dassets'
require 'dassets-sass'

module Romo::Dassets

  class UnitTests < Assert::Context
    desc "Romo::Dassets"
    setup do
      Romo::Dassets.reset!
    end
    teardown do
      Romo::Dassets.reset!
    end
    subject{ Romo::Dassets }

    should have_imeths :configure!, :reset!

    should "configure Romo with Dassets" do
      subject.configure!

      source = Dassets.config.sources.detect do |source|
        source.path == Romo.gem_assets_path.to_s
      end
      assert source
      assert_instance_of Dassets::Sass::Engine, source.engines["scss"]

      exp_css_sources = [
        'css/romo/normalize.css',
        'css/romo/base.css',
        'css/romo/colors.css',
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
        'css/romo/indicator_text_input.css',
        'css/romo/select.css',
        'css/romo/picker.css',
        'css/romo/datepicker.css',
        'css/romo/tooltip.css',
        'css/romo/sortable.css',
        'css/romo/z_index.css',
      ]
      assert_equal exp_css_sources, Dassets.config.combinations['css/romo.css']

      exp_js_sources = [
        'js/romo/base.js',
        'js/romo/date.js',
        'js/romo/currency.js',
        'js/romo/word_boundary_filter.js',
        'js/romo/ajax.js',
        'js/romo/onkey.js',
        'js/romo/form.js',
        'js/romo/dropdown.js',
        'js/romo/dropdown_form.js',
        'js/romo/indicator.js',
        'js/romo/indicator_text_input.js',
        'js/romo/currency_text_input.js',
        'js/romo/selected_options_list.js',
        'js/romo/option_list_dropdown.js',
        'js/romo/select_dropdown.js',
        'js/romo/select.js',
        'js/romo/picker.js',
        'js/romo/datepicker.js',
        'js/romo/inline.js',
        'js/romo/inline_form.js',
        'js/romo/modal.js',
        'js/romo/modal_form.js',
        'js/romo/tooltip.js',
        'js/romo/sortable.js'
      ]
      assert_equal exp_js_sources, Dassets.config.combinations['js/romo.js']
    end

    should "only configure itself once unless reset" do
      subject.configure!
      # modify the romo css so we can see that it isn't altered by calling
      # configure again unless we call reset
      Dassets.configure do |c|
        c.combination "css/romo.css", []
      end
      assert_equal [], Dassets.config.combinations['css/romo.css']
      subject.configure!
      assert_equal [], Dassets.config.combinations['css/romo.css']

      subject.reset!

      assert_equal [], Dassets.config.combinations['css/romo.css']
      subject.configure!
      assert_not_equal [], Dassets.config.combinations['css/romo.css']
    end

  end

end
