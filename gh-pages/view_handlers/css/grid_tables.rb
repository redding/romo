require 'view_handlers/_helpers/css_handler'

module ViewHandlers; end
module ViewHandlers::CSS

  class GridTable
    include ViewHandlers::Helpers::CSSHandler

    page_title{ 'Grid-Tables' }

    def run!
      render 'css/grid_tables.html'
    end

  end

end
