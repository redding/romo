require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::Scaffolding; end
class ViewHandlers::Scaffolding

  class Helpers
    include ViewHandlers::Layouts::Docs

    page_title{ 'Scaffolding: Helper Classes' }

    def run!
      render 'scaffolding/helpers.html'
    end

  end

end
