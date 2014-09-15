require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Buttons
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Buttons' }

    def run!
      render 'css/buttons.html'
    end

  end

end
