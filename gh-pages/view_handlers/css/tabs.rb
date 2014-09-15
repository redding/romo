require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Tabs
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Tabs' }

    def run!
      render 'css/tabs.html'
    end

  end

end
