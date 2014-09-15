require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Helpers
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Helpers' }

    def run!
      render 'css/helpers.html'
    end

  end

end
