require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Globals
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Globals' }

    def run!
      render 'css/globals.html'
    end

  end

end
