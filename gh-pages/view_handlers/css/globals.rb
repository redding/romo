require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Globals
    include ViewHandlers::Layouts::Docs

    page_title{ 'Base CSS: Globals' }

    def run!
      render 'css/globals.html'
    end

  end

end
