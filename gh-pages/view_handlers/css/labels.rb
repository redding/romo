require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Labels
    include ViewHandlers::Layouts::Docs

    page_title{ 'Labels CSS' }

    def run!
      render 'css/labels.html'
    end

  end

end
