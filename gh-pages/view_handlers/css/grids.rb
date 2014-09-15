require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class Grid
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Grids' }

    def run!
      render 'css/grids.html'
    end

  end

end
