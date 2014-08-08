require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::Scaffolding; end
class ViewHandlers::Scaffolding

  class GridTable
    include ViewHandlers::Layouts::Docs

    page_title{ 'Grid Table | CSS' }

    def run!
      render 'scaffolding/grid_table.html'
    end

  end

end
