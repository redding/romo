require 'pathname'
require 'deas'

class RomoGHPages
  include Deas::Server

  logger     proc{ Logger.new($stdout) }
  root       proc{ Utils.app_root }
  views_root proc{ Utils.app_path('view_handlers') }

  init do
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
