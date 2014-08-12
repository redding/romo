require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Tabs
    include ViewHandlers::Layouts::Docs

    page_title{ 'Tabs CSS' }

    def run!
      render 'base-css/tabs.html'
    end

  end

end
