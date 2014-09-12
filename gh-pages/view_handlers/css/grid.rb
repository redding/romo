require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Grid
    include ViewHandlers::Layouts::Docs

    page_title{ 'Scaffolding: Grid' }

    def run!
      render 'css/grid.html'
    end

  end

end
