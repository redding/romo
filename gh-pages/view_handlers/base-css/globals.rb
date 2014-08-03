require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Globals
    include ViewHandlers::Layouts::Docs

    page_title{ 'Base CSS: Globals' }

    def run!
      render 'base-css/globals.html'
    end

  end

end
