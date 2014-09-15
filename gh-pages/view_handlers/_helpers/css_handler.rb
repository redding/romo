require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::Helpers

  module CSSHandler

    def self.included(receiver)
      receiver.class_eval do
        include ViewHandlers::Layouts::Docs

        before_init do
          doc_link 'Globals',     :css_globals
          doc_link 'Helpers',     :css_helpers
          doc_link 'Typography',  :css_typography
          doc_link 'Images',      :css_images
          doc_link 'Forms',       :css_forms
          doc_link 'Buttons',     :css_buttons
          doc_link 'Labels',      :css_labels
          doc_link 'Tabs',        :css_tabs
          doc_link 'Lists',       :css_lists
          doc_link 'Grid',        :css_grids
          doc_link 'Tables',      :css_tables
          doc_link 'Grid Table',  :css_grid_tables
        end

      end

    end

  end

end
