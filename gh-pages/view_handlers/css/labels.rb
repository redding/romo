require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Labels
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Labels' }

    def run!
      render 'css/labels.html'
    end

  end

end
