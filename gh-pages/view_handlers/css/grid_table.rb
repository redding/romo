require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class GridTable
    include ViewHandlers::Layouts::Docs

    page_title{ 'Grid Table | CSS' }

    def run!
      render 'css/grid_table.html'
    end

  end

end
