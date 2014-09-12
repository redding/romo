require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Tables
    include ViewHandlers::Layouts::Docs

    page_title{ 'Tables' }

    def run!
      render 'css/tables.html'
    end

  end

end
