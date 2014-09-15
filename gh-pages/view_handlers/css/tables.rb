require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Tables
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Tables' }

    def run!
      render 'css/tables.html'
    end

  end

end
