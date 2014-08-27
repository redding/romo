require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::BaseCSS; end
class ViewHandlers::BaseCSS

  class Labels
    include ViewHandlers::Layouts::Docs

    page_title{ 'Labels CSS' }

    def run!
      render 'base-css/labels.html'
    end

  end

end
