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

      end

    end

  end

  module InstanceMethods

  end

  module ClassMethods

  end

end
