require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Tabs
    include ViewHandlers::Layouts::Docs

    page_title{ 'Tabs CSS' }

    def run!
      render 'css/tabs.html'
    end

  end

end
