require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Grid
    include ViewHandlers::Layouts::Docs

    page_title{ 'Grids' }

    def run!
      render 'css/grids.html'
    end

  end

end
