require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Lists
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Lists' }

    def run!
      render 'css/lists.html'
    end

  end

end
