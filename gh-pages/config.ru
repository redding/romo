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
require 'romo/dassets'

class RomoGHPages
  include Deas::Server

  view_handler_ns 'ViewHandlers'
  base_url "/pages/teaminsight/romo"

  # CSS
  url :css_globals,    '/css/globals.html'
  url :css_helpers,    '/css/helpers.html'
  url :css_typography, '/css/typography.html'
  url :css_images,     '/css/images.html'
  url :css_forms,      '/css/forms.html'
  url :css_buttons,    '/css/buttons.html'
  url :css_labels,     '/css/labels.html'
  url :css_tabs,       '/css/tabs.html'
  url :css_lists,      '/css/lists.html'
  url :css_grid,       '/css/grid.html'
  url :css_tables,     '/css/tables.html'
  url :css_grid_table, '/css/grid-table.html'

  get :css_globals,    'CSS::Globals'
  get :css_helpers,    'CSS::Helpers'
  get :css_typography, 'CSS::Typography'
  get :css_images,     'CSS::Images'
  get :css_forms,      'CSS::Forms'
  get :css_buttons,    'CSS::Buttons'
  get :css_labels,     'CSS::Labels'
  get :css_tabs,       'CSS::Tabs'
  get :css_lists,      'CSS::Lists'
  get :css_grid,       'CSS::Grid'
  get :css_tables,     'CSS::Tables'
  get :css_grid_table, 'CSS::GridTable'

  # Testing
  url :test_index,    '/test/index.html'
  url :test_kramdown, '/test/kramdown.html'

  get :test_index,    'Test::Index'
  get :test_kramdown, 'Test::Kramdown'

  # General stuff
  get '/index.html', 'Index'

  init do
    Romo::Dassets.configure!

    Dassets.configure do |c|
      c.cache Dassets::Cache::MemCache.new
      c.base_url self.base_url

      c.source Utils.app_path('assets').to_s do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_.*\.scss$/ } }
        s.engine 'erb',  Dassets::Erb::Engine
        s.engine 'scss', Dassets::Sass::Engine, {
          :syntax => 'scss',
          :output_style => 'compressed'
        }
      end

      c.combination "css/web.css", [
        "css/romo.css",
        "css/coderay.css",
        "css/gh-pages.css"
      ]

      c.combination "js/web.js", [
        "js/zepto-1-1-4-default-min.js",
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
