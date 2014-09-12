require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Lists
    include ViewHandlers::Layouts::Docs

    page_title{ 'Lists' }

    def run!
      render 'css/lists.html'
    end

  end

end
