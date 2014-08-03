require 'rubygems'

# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)
require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])

require 'pathname'
require 'deas'
require 'dassets'
require 'dassets-sass'
require 'dassets-erb'
require 'dassets/server'
require 'kramdown'
require 'romo'

class RomoGHPages
  include Deas::Server

  view_handler_ns 'ViewHandlers'
  base_url "/pages/teaminsight/romo"

  # Base CSS
  url :base_css_globals,    '/base-css/globals.html'
  url :base_css_typography, '/base-css/typography.html'

  get :base_css_globals,    'BaseCSS::Globals'
  get :base_css_typography, 'BaseCSS::Typography'

  # Testing
  url :test_index,    '/test/index.html'
  url :test_kramdown, '/test/kramdown.html'

  get :test_index,    'Test::Index'
  get :test_kramdown, 'Test::Kramdown'

  # General stuff
  get '/index.html', 'Index'

  init do
    Dassets.configure do |c|

      c.base_url self.base_url

      # TODO: have a gem, "romo-dassets", do this eventually
      # Romo's assets path
      c.source Romo.gem_assets_path do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_/ } }
        s.engine 'scss', Dassets::Sass::Engine, :syntax => 'scss'
        s.engine 'erb',  Dassets::Erb::Engine
      end

      c.combination "css/romo.css", [
        'css/romo/normalize.css',
        'css/romo/base.css',
        'css/romo/inputs.css',
        'css/romo/dropdown.css',
        'css/romo/modal.css',
        'css/romo/select.css',
        'css/romo/datepicker.css',
        'css/romo/tooltip.css',
        'css/romo/z_index.css',
      ]
      c.combination "js/romo.js", [
        'js/romo/base.js',
        'js/romo/invoke.js',
        'js/romo/form.js',
        'js/romo/dropdown.js',
        'js/romo/select.js',
        'js/romo/datepicker.js',
        'js/romo/inline.js',
        'js/romo/inline_form.js',
        'js/romo/modal.js',
        'js/romo/modal_form.js',
        'js/romo/tooltip.js',
        'js/romo/indicator.js',
      ]

      # gh-pages assets path
      c.source Utils.app_path('assets').to_s do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_.*\.scss$/ } }
        s.engine 'scss', Dassets::Sass::Engine, :syntax => 'scss'
        s.engine 'erb',  Dassets::Erb::Engine
      end

      c.combination "css/web.css", [
        "css/romo.css",
        "css/coderay.css",
        "css/gh-pages.css"
      ]

      c.combination "js/web.js", [
        "js/vendor/zepto-1-1-4-default-min.js",
        "js/romo.js",
      ]

    end

    Dassets.init
    use Dassets::Server

    Utils.require_rb 'view_handlers/_helpers'
    Utils.require_rb 'view_handlers/_layouts'
    Utils.require_rb 'view_handlers'
  end

  logger     proc{ Logger.new($stdout) }
  root       proc{ Utils.app_root }
  views_root proc{ Utils.app_path('view_handlers') }

  show_exceptions  true
  reload_templates true

  module TemplateHelpers; end
  template_helpers TemplateHelpers

  private

  module Utils

    def self.require_rb(path)
      Dir[self.app_root.join(path,'**', '*.rb')].each do |file|
        require file.sub("#{app_root}/", '').sub(/\.rb\Z/, '')
      end
    end

    def self.app_path(path)
      self.app_root.join(path)
    end

    def self.app_root
      @app_root ||= Pathname.new(File.expand_path('..', __FILE__))
    end

  end

  module TemplateHelpers

    def kramdown(template_path)
      text = File.read(self.sinatra_call.settings.views.join(template_path))
      opts = {
        :input => 'GFM',
        :coderay_line_numbers => nil,
        :coderay_css => :class
      }
      Kramdown::Document.new(text, opts).to_html
    end

  end

end

run RomoGHPages.new
