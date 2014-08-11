require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Nav
    include ViewHandlers::Layouts::Docs

    page_title{ 'Nav CSS' }

    def run!
      render 'base-css/nav.html'
    end

  end

end
