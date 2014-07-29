require 'deas/view_handler'

module ViewHandlers; end
module ViewHandlers::Layouts

  module Web

    def self.included(receiver)
      receiver.class_eval do
        include Deas::ViewHandler
        include InstanceMethods
        extend ClassMethods

        style  "css/romo.css", "css/web.css"
        script "js/romo.js",   "js/web.js"
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

    def stylesheets
      self.class.stylesheets
    end

    def javascripts
      self.class.javascripts
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
