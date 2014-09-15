require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Forms
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Forms' }

    def run!
      render 'css/forms.html'
    end

  end

end
