require 'dassets'
require 'dassets-sass'
require 'romo'

module Romo; end
module Romo::Dassets

  # TODO: this is a prototype - I'm not even sure how this API will shake out.
  # eventually would have a gem, "romo-dassets", do this or something

  def self.configure!
    return if @configured

    Dassets.configure do |c|
      c.source Romo.gem_assets_path do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_/ } }

        s.engine 'scss', Dassets::Sass::Engine, {
          :syntax       => 'scss',
          :output_style => 'compressed' # TODO: let them override output style
        }
      end

      c.combination "css/romo.css", [
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
      c.combination "js/romo.js", [
        'js/romo/base.js',
        'js/romo/date.js',
        'js/romo/currency.js',
        'js/romo/word_boundary_filter.js',
        'js/romo/ajax.js',
        'js/romo/onkey.js',
        'js/romo/spinner.js',
        'js/romo/form.js',
        'js/romo/dropdown.js',
        'js/romo/dropdown_form.js',
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
    end

    @configured = true
  end

  def self.reset!; @configured = false; end

end
