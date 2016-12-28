require 'rubygems'

# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)
require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])

require 'pathname'
require 'deas'
require 'deas-erubis'
require 'dassets'
require 'dassets-sass'
require 'dassets-erb'
require 'dassets/server'
require 'kramdown'
require 'romo'
require 'romo/dassets'

RomoDocsRouter = Deas::Router.new do

  view_handler_ns 'ViewHandlers'
  base_url "/romo"

  # CSS
  url :css_globals,     '/css/globals.html'
  url :css_helpers,     '/css/helpers.html'
  url :css_typography,  '/css/typography.html'
  url :css_images,      '/css/images.html'
  url :css_forms,       '/css/forms.html'
  url :css_buttons,     '/css/buttons.html'
  url :css_labels,      '/css/labels.html'
  url :css_tabs,        '/css/tabs.html'
  url :css_lists,       '/css/lists.html'
  url :css_grids,       '/css/grids.html'
  url :css_tables,      '/css/tables.html'
  url :css_grid_tables, '/css/grid-tables.html'

  get :css_globals,     'CSS::Globals'
  get :css_helpers,     'CSS::Helpers'
  get :css_typography,  'CSS::Typography'
  get :css_images,      'CSS::Images'
  get :css_forms,       'CSS::Forms'
  get :css_buttons,     'CSS::Buttons'
  get :css_labels,      'CSS::Labels'
  get :css_tabs,        'CSS::Tabs'
  get :css_lists,       'CSS::Lists'
  get :css_grids,       'CSS::Grid'
  get :css_tables,      'CSS::Tables'
  get :css_grid_tables, 'CSS::GridTable'

  # General
  url :index,    '/index.html'
  url :css_show, '/css.html'

  get :index,    'Index'
  get :css_show, 'CSSShow'

end

class RomoDocs
  include Deas::Server

  router RomoDocsRouter

  init do
    root   Utils.app_root
    logger Logger.new($stdout)

    show_exceptions true
    verbose_logging true

    ts = ::Deas::TemplateSource.new(Utils.views_path).tap do |s|
      s.engine('erb', Deas::Erubis::TemplateEngine, {
        'cache'   => false,
        'helpers' => [TemplateHelpers]
      })
    end
    template_source ts

    Romo::Dassets.configure!

    Dassets.configure do |c|
      c.fingerprint_cache ::Dassets::Cache::MemCache.new

      c.base_url self.router.base_url

      c.source Utils.app_path('assets').to_s do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_.*\.scss$/ } }
        s.engine 'erb',  Dassets::Erb::Engine
        s.engine 'scss', Dassets::Sass::Engine, {
          :syntax       => 'scss',
          :output_style => 'compressed',
          :load_paths   => [Romo.gem_assets_path]
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
        "js/gh-pages.js"
      ]
    end

    Dassets.init
    use Dassets::Server

    Utils.require_rb 'view_handlers/_helpers'
    Utils.require_rb 'view_handlers/_layouts'
    Utils.require_rb 'view_handlers'
  end

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

    def self.views_path
      @views_path ||= 'view_handlers'
    end

    def self.views_root
      @views_root ||= self.app_root.join(self.views_path)
    end

  end

  module TemplateHelpers

    def h(html)
      Rack::Utils.escape_html(html)
    end

    def kramdown(template_path)
      text = File.read(Utils.views_root.join(template_path))
      opts = {
        :input                => 'GFM',
        :coderay_line_numbers => nil,
        :coderay_css          => :class
      }
      Kramdown::Document.new(text, opts).to_html
    end

  end

end

run RomoDocs.new
