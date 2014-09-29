require 'deas/view_handler'

module ViewHandlers; end
module ViewHandlers::Layouts

  module Web

    def self.included(receiver)
      receiver.class_eval do
        include Deas::ViewHandler
        include InstanceMethods
        extend ClassMethods

        style  "css/web.css"
        script "js/web.js"
        layout "_layouts/web.html"

      end

    end

  end

  module InstanceMethods

    def layout_page_title
      @layout_page_title ||= begin
        page_title  = self.instance_eval(&(self.class.page_title || Proc.new{}))
        [ page_title, 'Romo' ].compact.join(" | ")
      end
    end

    def stylesheet_urls
      @stylesheet_urls ||= self.class.stylesheets.map do |style_path|
        RomoDocsRouter.prepend_base_url(Dassets[style_path].href)
      end
    end

    def javascript_urls
      self.class.javascripts
      @javascript_urls ||= self.class.javascripts.map do |script_path|
        RomoDocsRouter.prepend_base_url(Dassets[script_path].href)
      end
    end

    def favicon_url
      RomoDocsRouter.prepend_base_url(Dassets['img/romo-favicon-rocket.png'].href)
    end

    def logo_url
      RomoDocsRouter.prepend_base_url(Dassets['img/romo-logo.png'].href)
    end

  end

  module ClassMethods

    def page_title(&block)
      @page_title = block if block
      @page_title
    end

    def style(*args)
      self.stylesheets.push(*args)
    end

    def stylesheets
      @stylesheets ||= []
    end

    def script(*args)
      self.javascripts.push(*args)
    end

    def javascripts
      @javascripts ||= []
    end

  end

end
