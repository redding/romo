require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Helpers
    include ViewHandlers::Layouts::Docs

    page_title{ 'Scaffolding: Helper Classes' }

    def run!
      render 'css/helpers.html'
    end

  end

end
