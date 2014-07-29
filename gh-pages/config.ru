require 'pathname'
require 'deas'
require 'dassets'
require 'dassets-sass'
require 'dassets-erb'
require 'dassets/server'
require 'romo'

class RomoGHPages
  include Deas::Server

  logger     proc{ Logger.new($stdout) }
  root       proc{ Utils.app_root }
  views_root proc{ Utils.app_path('view_handlers') }

  init do
    Dassets.config.file_store self.configuration.public_root

    # TODO: have a gem, "romo-dassets", do this eventually
    Dassets.configure do |c|

      # Romo's assets path
      c.source Romo.gem_assets_path do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_/ } }
        s.engine 'scss', Dassets::Sass::Engine, :syntax => 'scss'
        s.engine 'erb',  Dassets::Erb::Engine
      end

      # gh-pages assets path
      c.source Utils.app_path('assets').to_s do |s|
        s.filter{ |paths| paths.reject{ |p| File.basename(p) =~ /^_.*\.scss$/ } }
        s.engine 'scss', Dassets::Sass::Engine, :syntax => 'scss'
        s.engine 'erb',  Dassets::Erb::Engine
      end

      c.combination "css/romo.css", [
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
    end

    Dassets.init
    use Dassets::Server

    Utils.require_rb 'view_handlers/_helpers'
    Utils.require_rb 'view_handlers/_layouts'
    Utils.require_rb 'view_handlers'
  end

  view_handler_ns 'ViewHandlers'

  get '/', 'Index'

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

end

run RomoGHPages.new
