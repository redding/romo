require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::Scaffolding; end
class ViewHandlers::Scaffolding

  class Grid
    include ViewHandlers::Layouts::Docs

    page_title{ 'Scaffolding: Grid' }

    def run!
      render 'scaffolding/grid.html'
    end

  end

end
