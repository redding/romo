require 'view_handlers/_layouts/web'

module ViewHandlers; end
module ViewHandlers::Layouts

  module Docs

    def self.included(receiver)
      receiver.class_eval do
        include ViewHandlers::Layouts::Web
        include InstanceMethods
        extend ClassMethods

        layout "_layouts/docs.html"

        before_init do
          @docs_links = []
        end

      end

    end

    module InstanceMethods

      attr_reader :docs_links

      def doc_link(name, url_name)
        @docs_links.push(Link.new(name, RomoDocsRouter.url_for(url_name)))
      end

      def request_path_info
        self.request.path_info
      end

    end

    module ClassMethods

    end

    class Link

      attr_reader :name, :href, :href_path_info

      def initialize(name, href)
        @name, @href = name, href
        @href_path_info = href.split('?').first
      end

      def active_class_str(current_href)
        current_href.downcase.include?(@href_path_info.downcase) ? 'active' : ''
      end

    end

  end

end
