require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class GridTable
    include ViewHandlers::Layouts::Docs

    page_title{ 'Grid-Tables' }

    def run!
      render 'css/grid_tables.html'
    end

  end

end
